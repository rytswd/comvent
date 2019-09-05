# Comvent for GitHub Actions

## **WHAT**: Search in Comment Event

Only a few dozens of lines of TypeScript to help streamline the GitHub Actions based on Issue and PR comments.

## **HOW**: Examples

You can find the actual `comvent` usage in this repo's [`.github/workflows/comvent.yml`](.github/workflows/comvent.yml)

```yaml
name: Comvent - Run if comment matches the keyword
on: issue_comment

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: rytswd/comvent@v0.1.0     # This line would pull down the release version of comvent
        id: comvent                     # Add an ID, so that you can control your step later
        with:
          keyword: Trigger              # This is the regex string to search in the comment

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

## **WHY**: Quick and Cheap

GitHub Actions can be defined either in JavaScript or Docker container.

Docker container allows full segregation and secure setup, but it takes about ~10sec to build and start up.  
When you wish to use GitHub Actions on frequently used events such as PR and Issue Comments, this can easily add up.

The solution `comvent` provides is a cheaper solution than Docker equivalent (written in only dozens of lines in TypeScript), and provides a building block for much more complex setup.
