import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todo';

describe('Todo component', () => {

    const baseTodo = {
        _id: '1',
        text: 'Write code',
        done: false
    };

    it('Muestra el texto del Todo', () => {
        render(<Todo todo={ baseTodo } />);
        expect( screen.getByLabelText('todo-text')).toHaveTextContent('Write code');
    });

    it('Muestra el boton Mark done cuando no esa done', () => {
        render(<Todo todo={ baseTodo } />);
        expect( screen.getByLabelText('mark-done')).toBeInTheDocument();
    });

    it('No muestra el boton Mark done cuando esta en done', () => {
        render(<Todo todo={ { ...baseTodo, done: true }} />);
        expect( screen.queryByLabelText('mark-done')).not.toBeInTheDocument();
    });

    it('Ejecuta el onComplete cuando se seleccion ', async() => {
        const onComplete = vi.fn();
        render(<Todo todo={ baseTodo } onCompleteTodo={ onComplete }/>);
        const user = userEvent.setup();
        await user.click( screen.getByLabelText('mark-done') );
        expect(onComplete).toHaveBeenCalledWith(baseTodo);
    });

    it('Ejecuta el onDelete cuando se seleccion ', async() => {
        const onDelete = vi.fn();
        render(<Todo todo={ baseTodo } onDeleteTodo={ onDelete }/>);
        const user = userEvent.setup();
        await user.click( screen.getByLabelText('delete-todo') );
        expect(onDelete).toHaveBeenCalledWith(baseTodo);
    });
});