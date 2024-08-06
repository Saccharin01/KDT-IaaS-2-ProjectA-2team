import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'testDataBase',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://chousik01:70318202@cluster0.mmiiheq.mongodb.net/'),
  },
];