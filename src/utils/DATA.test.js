import { _saveQuestion, _getUsers, _getQuestions, _saveQuestionAnswer } from './_DATA';

describe('_saveQuestion function', () => {
    it('saves a question and returns formatted question object', async () => {
        const questionData = {
            optionOneText: 'Option One',
            optionTwoText: 'Option Two',
            author: 'sarahedo'
        };

        try {
            const savedQuestion = await _saveQuestion(questionData);
            expect(savedQuestion).toBeDefined();
            expect(savedQuestion.id).toBeDefined();
            expect(savedQuestion.timestamp).toBeDefined();
            expect(savedQuestion.author).toBe(questionData.author);
            expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
            expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
        } catch (error) {
            // Fail the test if an error occurs
            fail('Should not throw an error for correct data');
        }
    });
});


describe('_saveQuestion function 2', () => {
    it('throws an error for missing data fields', async () => {
        const incompleteQuestion = {
            optionOneText: 'Option One',
            // Missing optionTwoText and author
        };

        try {
            await _saveQuestion(incompleteQuestion);
            fail('Should throw an error for missing data');
        } catch (error) {
            expect(error).toEqual('Please provide optionOneText, optionTwoText, and author');
        }
    });
});

describe('_saveQuestion Function 3', () => {
    it('should save a new question correctly', async () => {
        // Mock question data
        const question = {
            optionOneText: 'Option One Text',
            optionTwoText: 'Option Two Text',
            author: 'tylermcginnis',
        };

        // Call _saveQuestion function
        const savedQuestion = await _saveQuestion(question);

        // Assert that savedQuestion contains all expected fields
        expect(savedQuestion).toHaveProperty('id');
        expect(savedQuestion).toHaveProperty('timestamp');
        expect(savedQuestion).toHaveProperty('author', question.author);
        expect(savedQuestion).toHaveProperty('optionOne');
        expect(savedQuestion).toHaveProperty('optionTwo');
    });

    it('should reject with an error if data is incorrect', async () => {
        // Mock incorrect question data
        const incorrectQuestion = {
            optionOneText: 'Option One Text',
            // Missing optionTwoText and author
        };

        // Call _saveQuestion function and expect it to reject
        await expect(_saveQuestion(incorrectQuestion)).rejects.toMatch(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
});


describe('_saveQuestion Function 4', () => {
    it('should reject with an error if data is incorrect', async () => {
        // Mock incorrect question data
        const incorrectQuestion = {
            optionOneText: 'Option One Text',
            // Missing optionTwoText and author
        };

        // Call _saveQuestion function and expect it to reject
        await expect(_saveQuestion(incorrectQuestion)).rejects.toMatch(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
});

describe('_saveQuestionAnswer function', () => {
    it('returns true for correct data', async () => {
        const answerData = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionOne'
        };

        try {
            const result = await _saveQuestionAnswer(answerData);
            expect(result).toBe(true);
        } catch (error) {
            // Fail the test if an error occurs
            fail('Should not throw an error for correct data');
        }
    });
});

describe('_saveQuestionAnswer function 2', () => {
    it('throws an error for missing data fields', async () => {
        const incompleteAnswer = {
            authedUser: 'sarahedo',
        };

        try {
            await _saveQuestionAnswer(incompleteAnswer);
            fail('Should throw an error for missing data');
        } catch (error) {
            expect(error).toEqual('Please provide authedUser, qid, and answer');
        }
    });
});


describe('_saveQuestionAnswer Function 3', () => {
    it('should save a question answer correctly', async () => {
        const answerData = {
            authedUser: 'tylermcginnis',
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionTwo',
        };

        const result = await _saveQuestionAnswer(answerData);

        expect(result).toBe(true);

    });

});


describe('_saveQuestionAnswer Function 4', () => {
    it('should reject with an error if data is incorrect', async () => {
        const incorrectAnswerData = {
        };

        await expect(_saveQuestionAnswer(incorrectAnswerData)).rejects.toMatch(
            'Please provide authedUser, qid, and answer'
        );
    });
});
