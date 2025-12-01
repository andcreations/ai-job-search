import { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import { InternalServerError } from '@ai-job-search/common';

export abstract class CheckpointSaverProvider {
  private checkpointSaver: BaseCheckpointSaver;

  // Must be called from the subclasses, typically in the onModuleInit method.
  protected async init(): Promise<void> {
    this.checkpointSaver = await this.createCheckpointSaver();
  }

  protected abstract createCheckpointSaver(): Promise<BaseCheckpointSaver>;

  public getCheckpointSaver(): BaseCheckpointSaver {
    if (!this.checkpointSaver) {
      throw new InternalServerError('Checkpoint saver not initialized');
    }
    return this.checkpointSaver;
  }
}