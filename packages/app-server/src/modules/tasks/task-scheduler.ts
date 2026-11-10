import type { Config } from '../app/config/config.types';
import type { Storage } from '../storage/storage.types';
import type { TaskDefinition } from './tasks.types';
import cron from 'node-cron';
import { createLogger } from '../shared/logger/logger';

export { createTaskScheduler };

const logger = createLogger({ namespace: 'tasks:scheduler' });

function createTaskScheduler({
  config,
  taskDefinitions,
  tasksArgs,
}: {
  config: Config;
  taskDefinitions: TaskDefinition[];
  tasksArgs: { storage: Storage };
}) {
  const scheduledTasks = taskDefinitions.map((taskDefinition) => {
    const isEnabled = taskDefinition.getIsEnabled({ config });
    const cronSchedule = taskDefinition.getCronSchedule({ config });
    const runOnStartup = taskDefinition.getRunOnStartup({ config });

    if (!isEnabled) {
      return undefined;
    }

    // createTask returns a stopped task, it only runs once started
    const task = cron.createTask(cronSchedule, () => {
      taskDefinition.run({ ...tasksArgs, config });
    });

    logger.info({ taskName: taskDefinition.taskName, cronSchedule }, 'Task registered');

    return { job: task, taskName: taskDefinition.taskName, runOnStartup };
  }).filter(Boolean);

  return {
    scheduledTasks,
    start() {
      scheduledTasks.forEach(({ taskName, job, runOnStartup }) => {
        job.start();
        logger.info({ taskName }, 'Task scheduled');

        if (runOnStartup) {
          job.execute();
        }
      });
    },
  };
}
