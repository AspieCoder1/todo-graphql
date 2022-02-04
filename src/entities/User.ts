import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Authorized, Field, ID, ObjectType, Root } from 'type-graphql';
import { Todo } from './Todo';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Authorized()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@Field()
	@Column('text', { unique: true })
	email: string;

	@Column()
	password: string;

	@Field(type => [Todo])
	@OneToMany(() => Todo, todo => todo.user)
	todos: Todo[];
}