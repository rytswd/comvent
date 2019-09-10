# Comvent for GitHub Actions

## **WHAT**: Search in Comment Event

Only a few dozens of lines of TypeScript to help streamline the GitHub Actions based on Issue and PR comments.

## **HOW**: Example with `comvent`

You can find the actual `comvent` usage in this repo's [`.github/workflows/comvent.yml`](.github/workflows/comvent.yml)

```yaml
name: Comvent - Run if comment matches the keyword
on: issue_comment

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: rytswd/comvent@v0.1.0 # This line would pull down the release version of comvent
        id: comvent # Add an ID, so that you can control your step later
        with:
          keyword: Trigger # This is the regex string to search in the comment

      - name: Some random step
        run: |
          echo This step simply runs, as there is no condition check

        # ...
        # You can have as many steps as you need - without "if:" clause, these will run unconditionally
        # ...
      - name: Run when comvent matches
        run: |
          echo You see this step running only when comvent found the matching keyword in the comment event
        # This checks whether comvent found a match
        if: steps.comvent.outputs.comvent != ''
        # Comvent returns the following values
        #   if found -> "found"
        #   if not   -> ""
```

You can find more examples in this repo's [`.github/workflows/`](.github/workflows/).

## **HOW**: Exmaple without `comvent`, Only Shell

```yaml
name: Shell - achieve comvent equivalent
on: issue_comment

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - name: Check Comment
      - run: |
        # Get hold of `jq' command
        ...

        # Query in comment with egrep, etc.
        # You will need to add condition handling of when and when not found
        cat $GITHUB_EVENT_PATH | jq .event.comment.body | egrep 'Trigger'
        ...

        # Special syntax used in GitHub Actions to set output
        echo '##[set-output name=comvent;]found'

      - name: Run when comvent matches
        run: |
          echo You see this step running only when comvent found the matching keyword in the comment event
        # This checks whether comvent found a match
        if: steps.comvent.outputs.comvent != ''
        # Comvent returns the following values
        #   if found -> "found"
        #   if not   -> ""
```

As shown, you will need to be able to parse the JSON formatted `GITHUB_EVENT` which is located at `$GITHUB_EVENT_PATH`.

The main objective of `comvent` is to remove any burdens in setting up the JSON formatting, regex search, etc., and simply allow you to write a query without too much of the implementation details abstracted away.

## **WHY**: Quick and Cheap

GitHub Actions can be defined either in JavaScript or Docker container.

Docker container allows full segregation and secure setup, but it takes about ~10sec to build and start up.  
When you wish to use GitHub Actions on frequently used events such as PR and Issue Comments, this can easily add up.

The solution `comvent` provides is a cheaper solution than Docker equivalent (written in only dozens of lines in TypeScript), and provides a building block for much more complex setup.
