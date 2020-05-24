import { Component } from '@angular/core';
import { Firegraph, FiregraphNodeSet, FiregraphContext } from '@astronautlabs/firegraph';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private matSnackbar : MatSnackBar
  ) {

  }
  readonly = false;
  active = false;
  graphContext : FiregraphContext;
  dirty = false;

  onSaveRequested() {
    if (this.dirty) {
      this.dirty = false;
      this.matSnackbar.open(
        "Pretending to save your changes!", 
        undefined, {
          duration: 1000
        }
      );
    } else {
      this.matSnackbar.open(
        "No changes need to be saved!", 
        undefined, 
        {
          duration: 1000
        }
      );
    }
  }

  onContextChanged(context : FiregraphContext) {
    this.graphContext = context;

    console.log(`Received graph context from <fg-editor>:`);
    console.dir(context);
  }

  onGraphChanged(graph : Firegraph) {
    this.dirty = true;
    this.matSnackbar.open('You have changed the graph!', undefined, {
      duration: 1000
    });
  }

  myGraph : Firegraph = {
    edges: [], 
    nodes: [
      {
        id: 'one',
        data: { 
          unit: 'my-input',
          textProperty: 'hello'
        },
        label: 'My Input',
        x: 50, 
        y: 50,
        slots: [
          { id: 'output', type: 'output', label: 'Output' }
        ]
      },
      {
        id: 'two',
        data: { unit: 'my-output' },
        label: 'My Output',
        x: 300, 
        y: 100,
        slots: [
          { id: 'input', type: 'input', label: 'Input' }
        ]
      }
    ]
  };
  
  availableNodes : FiregraphNodeSet[] = [
    {
        id: 'general',
        label: 'General',
        nodes: [
            {
                data: {
                    unit: 'my-input',
                    someProperty: 'abc'
                },
                label: 'My Input',
                slots: [
                    { id: 'output', type: 'output', label: 'Output' }
                ],
                properties: [
                    {
                        id: 'output-options',
                        label: 'Output Options',
                        properties: [
                            {
                                type: 'text',
                                path: '$.data.textProperty',
                                label: 'A Text Property',
                                description: 'This is an example of a text property!'
                            }
                        ]
                    }
                ]
            },
            {
                data: {
                    unit: 'my-output'
                },
                label: 'My Output',
                slots: [
                    { id: 'input', type: 'input', label: 'Input' }
                ]
            }
        ]
    }
]
}
