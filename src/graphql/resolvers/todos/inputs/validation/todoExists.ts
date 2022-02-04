import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Todo } from '@entities/Todo';

@ValidatorConstraint({ async: true })
export class TodoExistsConstraint implements ValidatorConstraintInterface {
	async validate(id: string) {
		const todo = await Todo.findOne({ where: { id } });
		console.log(todo);
		return !!todo;
	}
}

export function TodoExists(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: TodoExistsConstraint,
		});
	};
}
