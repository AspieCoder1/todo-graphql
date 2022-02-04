import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@entities/User';

@ObjectType()
@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	body: string;

	@Field()
	@Column()
	due: Date;

	@Field()
	@Column({ default: false })
	completed: boolean;

	@Column()
	@ManyToOne(() => User, user => user.todos)
	user: string;
}