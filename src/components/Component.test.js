import React from 'react';
import { render } from '@testing-library/react';
import Login from "./Login";


describe('Login Component', () => {
    it('renders initial login form correctly', () => {
        // Render the Login component
        const { container } = render(<Login />);

        // Assert that the rendered output matches the snapshot
        expect(container.firstChild).toMatchSnapshot();
    });

});


describe('Login Component 2', () => {
    it('renders login form with user input correctly', () => {
        // Simulate user input and render the Login component
        const { container, getByPlaceholderText } = render(<Login />);

        // Find the input fields and simulate user input
        const userInput = getByPlaceholderText('User');
        const passwordInput = getByPlaceholderText('Password');
        userInput.value = 'exampleUser';
        passwordInput.value = 'password123';

        // Assert that the rendered output matches the snapshot
        expect(container.firstChild).toMatchSnapshot();
    });
});



//
// describe('AppComponent 2', () => {
//     it('updates state after clicking a button', () => {
//         const { getByText, getByTestId } = render(<Nav />);
//         const button = getByText('Click me');
//         const display = getByTestId('display');
//
//         fireEvent.click(button);
//
//         expect(display).toHaveTextContent('Button clicked!');
//     });
// });

