import {comventComment, comventSetup} from '../src/util'
import {findMatches} from '../src/step-2-check-comment/find-match'

describe('findMatches', () => {
  test('no match', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody: 'some random comment'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', 'search for this text']])
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(new Map([['some_key', undefined]]))
  })

  test('simple match', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody: 'comment with search for this text'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', 'search for this text']]) // no group used
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(
      new Map([['some_key', 'comment with search for this text']])
    )
  })

  test('regexp match, simple', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody: 'random input with 1 digit in the comment'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', 'with \\d+']]) // no group used
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(
      new Map([['some_key', 'random input with 1 digit in the comment']])
    )
  })

  test('regexp match, with group', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody:
        'some comment with group match, which starts here, from: rytswd, providing you some simple tool;'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', '(from: .+;)']]) // group used, use that for result
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(
      new Map([['some_key', 'from: rytswd, providing you some simple tool;']])
    )
  })

  test('regexp match, with group, where group is empty string', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody: 'some random comment'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', '(no_match)?random']]) // group used, but no match with it
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(new Map([['some_key', 'some random comment']]))
  })

  test('regexp match, with group, non-alphabet', () => {
    const comment: comventComment = {
      username: 'random_username',
      commentBody: 'This 🚀 is ⛺️ some 🐳 長い ⚡️ random ⚠️ 文章。'
    }
    const setup: comventSetup = {
      trigger: 'default',
      usersWhitelisted: ['random_username'],
      usersBlacklisted: [],
      keywords: new Map([['some_key', '🐳']]) // group used, but no match with it
    }
    const result = findMatches(comment, setup)
    expect(result).toMatchObject(
      new Map([
        ['some_key', 'This 🚀 is ⛺️ some 🐳 長い ⚡️ random ⚠️ 文章。']
      ])
    )
  })
})
