import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@entities/User';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
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

	@Field()
	@Column()
	@ManyToOne(() => User, user => user.todos)
	user: number;
}
