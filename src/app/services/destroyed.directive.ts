import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable()
export abstract class DestroyedDirective implements OnDestroy {
  protected destroyed: Subject<void> = null;

  protected constructor() {
    this.destroyed = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
