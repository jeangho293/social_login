import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class githubUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  githubId: number;

  @Column()
  githubAccessToken: string;
}