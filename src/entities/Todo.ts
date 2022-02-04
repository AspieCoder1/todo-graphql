import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	body: string;

	@Column()
	user: string;
}