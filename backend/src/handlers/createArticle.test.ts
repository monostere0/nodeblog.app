// Import the necessary dependencies and functions for testing
import { handler } from './createArticle'; // Replace 'yourCode' with the actual file name or path
import createArticleFromParams from '../createArticleFromParams';
import { createResponse } from '../utils/lambda';
import { Context } from 'aws-lambda';

// Mock the dependencies
jest.mock('../createArticleFromParams');
jest.mock('../utils/lambda');

describe('Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an article with a valid event', async () => {
    const requestBody = {
      title: 'Test Article',
      content: 'This is a test article.',
    };
    const event = { body: JSON.stringify(requestBody) };
    const articleId = 'articleId';

    (createArticleFromParams as any).mockResolvedValueOnce(articleId);
    (createResponse as any).mockReturnValueOnce({
      statusCode: 200,
      body: { id: articleId },
    });

    const result = await handler(event, {} as Context, () => null);

    expect(createArticleFromParams).toHaveBeenCalledWith(
      expect.objectContaining(requestBody)
    );
    expect(createResponse).toHaveBeenCalledWith(200, { id: articleId });
    expect(result).toEqual({ statusCode: 200, body: { id: articleId } });
  });

  it('should return a 400 response when required fields are missing', async () => {
    const requestBody = { content: 'This is a test article.' };
    const event = { body: JSON.stringify(requestBody) };

    (createResponse as any).mockReturnValueOnce({
      statusCode: 400,
      body: { id: null },
    });

    const result = await handler(event, {} as Context, () => null);

    expect(createArticleFromParams).not.toHaveBeenCalled();
    expect(createResponse).toHaveBeenCalledWith(400, { id: null });
    expect(result).toEqual({ statusCode: 400, body: { id: null } });
  });

  it('should return a 400 response when event body is empty', async () => {
    const event = { body: '' };

    (createResponse as any).mockReturnValueOnce({
      statusCode: 400,
      body: { id: null },
    });

    const result = await handler(event, {} as Context, () => null);

    expect(createArticleFromParams).not.toHaveBeenCalled();
    expect(createResponse).toHaveBeenCalledWith(400, { id: null });
    expect(result).toEqual({ statusCode: 400, body: { id: null } });
  });

  it('should return a 400 response when event body has invalid JSON', async () => {
    const event = {
      body: '{ "title": "Test Article", "content": This is a test article." }',
    };

    (createResponse as any).mockReturnValueOnce({
      statusCode: 400,
      body: { id: null },
    });

    const result = await handler(event, {} as Context, () => null);

    expect(createArticleFromParams).not.toHaveBeenCalled();
    expect(createResponse).toHaveBeenCalledWith(400, { id: null });
    expect(result).toEqual({ statusCode: 400, body: { id: null } });
  });

  it('should properly handle line breaks and special characters in content', async () => {
    const requestBody = {
      title: 'Special Characters',
      content:
        'This is a test article with line breaks:\nLine 1\nLine 2\nAnd special characters: !@#$%^&*()',
    };
    const event = { body: JSON.stringify(requestBody) };
    const articleId = 'articleId';

    (createArticleFromParams as any).mockResolvedValueOnce(articleId);
    (createResponse as any).mockReturnValueOnce({
      statusCode: 200,
      body: { id: articleId },
    });

    const result = await handler(event, {} as Context, () => null);

    expect(createArticleFromParams).toHaveBeenCalledWith(
      expect.objectContaining(requestBody)
    );
    expect(createResponse).toHaveBeenCalledWith(200, { id: articleId });
    expect(result).toEqual({ statusCode: 200, body: { id: articleId } });
  });
});
