import { Board } from 'src/app/models/board.model';
import { Column } from './column.model';

export const BOARDNAMES: Board[] = [
  { name: 'Board 1', columns: [
    new Column('To Do', [
      "Pierwsza-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ]},
  { name: 'Board 2', columns: [
    new Column('To Do', [
      "Druga-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ]  },
  { name: 'Board 3', columns: [
    new Column('To Do', [
      "Trzecia-test",
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ] },
  { name: 'Board 4', columns: [
    new Column('To Do', [
      "Czwarta-test"
    ]),
    new Column('Work in Progress', [
      'test'
    ]),
    new Column('Done', [
    ])
  ] },
  { name: 'Board 5', columns: [
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
