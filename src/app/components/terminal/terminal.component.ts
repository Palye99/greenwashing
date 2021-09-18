import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DisplayOption, FunctionsUsingCSI, NgTerminal} from 'ng-terminal';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import { Terminal } from 'xterm';
import {DockerService} from '../../services/docker.service';
import {ResultCommand} from '../../models/resultCommand';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('term', {static: false}) child: NgTerminal;

  @Input() isLoading = false;
  @Input() container = false;
  @Input() firstCommande: string;
  @Input() firstError: string;

  @Input() choixTerm: number;

  commandToSend: string = '';

  displayOption: DisplayOption = {};
  displayOptionBounded: DisplayOption = {};//now it's not used
  underlying: Terminal;
  keyInput: string;
  inputControl = new FormControl();
  writeSubject = new Subject<string>();

  constructor(private dockerService: DockerService,) {
    // do nothing.
  }

  ngOnInit(): void {
    // do nothing.
  }

  async ngAfterViewInit() {

    await new Promise(f => setTimeout(f, 2000));

    this.child.write('\r\n$ ');

    await new Promise(f => setTimeout(f, 8000));

    this.child.write(this.firstCommande.substring(4));
    this.child.write('\r\n$ ');

    this.child.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        console.log('exec command', this.commandToSend);

        if (this.choixTerm === 2) {
          this.dockerService.shellCommand(this.commandToSend).subscribe((value: ResultCommand) => {
            if (value.result && value.result.length > 0) {
              this.child.write('\r\n ');
              this.child.write(value.result);
            }

            if (value.error && value.error.length > 0) {
              this.child.write('\r\n ');
              this.child.write(value.error);
            }

            this.child.write('\r\n$ ');
          });
        } else {
          this.dockerService.dockerCommand(this.choixTerm, this.firstCommande.trim().substring(4), this.commandToSend).subscribe((value: ResultCommand) => {
            if (value.result && value.result.length > 0) {
              this.child.write('\r\n ');
              this.child.write(value.result);
            }

            if (value.error && value.error.length > 0) {
              this.child.write('\r\n ');
              this.child.write(value.error);
            }

            this.child.write('\r\n$ ');
          });
        }

        // send command to api & display affichage return

        this.child.write('\r\n$ ');
        this.commandToSend = "";
      } else if (ev.keyCode === 8) {
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.commandToSend = this.commandToSend.slice(0, -1);
          console.log('del key', this.commandToSend);
          this.child.write('\b \b');
        }
      } else if (printable) {
        this.commandToSend += e.key;
        console.log('text', this.commandToSend);
        this.child.write(e.key);
      }
    });
  }

  onKeyInput(event: string) {
    this.keyInput = event;
  }

  write() {
    this.writeSubject.next(eval(`'${this.inputControl.value}'`));
  }
}
