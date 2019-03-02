import subMinutes from 'date-fns/sub_minutes';
import subHours from 'date-fns/sub_hours';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';

const today = new Date();

// TODO: change fieldname disk:'1' to default:'1'
export const decks = [
  { id: '1', name: 'Resume | NJN', disk: '1', owner: '1' },
  { id: '2', name: '이거 매워요?', disk: '6', owner: '1' },
  { id: '3', name: '見ぬが花', disk: '7', owner: '1' },
];

export const disks = [
  { id: '1', deck: '1', name: 'general', topic: 'rawr', type: 'TEXT' },
  { id: '2', deck: '1', name: 'Education', type: 'TEXT' },
  { id: '3', deck: '1', name: 'Experience', type: 'TEXT' },
  { id: '4', deck: '1', name: 'The Voice', type: 'VOIP' },
  { id: '5', deck: '1', name: 'Holodeck 18', type: 'HOLO' },
  { id: '6', deck: '2', name: 'general', type: 'TEXT' },
  { id: '7', deck: '3', name: 'general', type: 'TEXT' },
];

export const presence = [
  {
    id: '1',
    disk: '4',
    users: [{ id: '4', username: 'WillIAm' }],
  },
  {
    id: '2',
    disk: '5',
    users: [
      { id: '2', username: '龍ハヤブサ' },
      { id: '6', username: '홍길동' },
    ],
  },
];

export const users = [
  {
    id: '0',
    username: 'Guest',
    pin: 1234,
    online: true,
    status: 'SHOW',
    createdAt: subMonths(today, 1),
  },
  {
    id: '1',
    username: 'Niico',
    pin: 1337,
    online: true,
    status: 'SHOW',
    createdAt: subDays(today, 11),
  },
  {
    id: '2',
    username: '龍ハヤブサ',
    pin: 6323,
    online: true,
    status: 'BUSY',
    createdAt: subMonths(today, 8),
  },
  {
    id: '3',
    username: 'Kai',
    pin: 3469,
    online: true,
    status: 'HIDE',
    createdAt: subDays(today, 24),
  },
  {
    id: '4',
    username: 'WillIAm',
    pin: 2052,
    online: true,
    status: 'AWAY',
    createdAt: subDays(today, 5),
  },
  {
    id: '5',
    username: '山田太郎',
    pin: 4284,
    online: false,
    status: 'SHOW',
    createdAt: subDays(today, 14),
  },
  {
    id: '6',
    username: '홍길동',
    pin: 9282,
    online: true,
    status: 'SHOW',
    createdAt: subMonths(today, 3),
  },
  {
    id: '7',
    username: 'IronMan',
    pin: 5353,
    online: false,
    status: 'SHOW',
    createdAt: subDays(today, 9),
  },
];

export const messages = [
  { id: 1, body: 'Lorem Ipsum', createdAt: subMinutes(today, 1), author: '1' },
  {
    id: 2,
    body: 'Sic dolor amet',
    createdAt: subMinutes(today, 25),
    updatedAt: subMinutes(today, 18),
    author: '2',
  },
  {
    id: 3,
    body: 'Lorem Ipsum',
    createdAt: subMinutes(today, 45),
    author: '1',
  },
  {
    id: 4,
    body: 'Sic dolor amet',
    createdAt: subHours(today, 3),
    author: '2',
  },
  { id: 5, body: 'Lorem Ipsum', createdAt: subHours(today, 7), author: '1' },
  { id: 6, body: 'Sic dolor amet', createdAt: subDays(today, 1), author: '2' },
  { id: 7, body: 'Lorem Ipsum', createdAt: subDays(today, 5), author: '1' },
  {
    id: 8,
    body: 'Sic dolor amet',
    createdAt: subDays(today, 11),
    author: '2',
  },
  { id: 9, body: 'Lorem Ipsum', createdAt: subDays(today, 23), author: '1' },
  {
    id: 10,
    body: 'Sic dolor amet',
    createdAt: subMonths(today, 3),
    author: '2',
  },
];

/*export default {
  ...Deck,
  ...Disk,
  ...Presence,
  ...User,
  ...Message,
};*/
