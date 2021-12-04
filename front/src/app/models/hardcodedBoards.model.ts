import { Board } from 'src/app/models/board.model';
import { Column } from './column.model';

export const BOARDNAMES: Board[] = [
  { name: 'Pierwsza', columns: [
    new Column('To Do', [
      "Pierwsza-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ]},
  { name: 'Druga', columns: [
    new Column('To Do', [
      "Druga-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ]  },
  { name: 'Trzecia', columns: [
    new Column('To Do', [
      "Trzecia-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ] },
  { name: 'Czwarta', columns: [
    new Column('To Do', [
      "Czwarta-test"
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ] },
  { name: 'Piąta', columns: [
    new Column('To Do', [
      "Piąta-test"
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ] },
];
