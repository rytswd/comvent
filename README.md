# Comvent - Simple Step for Comment Event with GitHub Actions

## Example

You can find the actual `comvent` usage in this repo's [`.github/workflows/comvent.yml`](.github/workflows/comvent.yml)

```yaml
name: Comvent - Run if comment matches the keyword
on: issue_comment

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: rytswd/comvent@v0.1-release   # This line would pull down the release version of comvent
        id: comvent                         # Add an ID, so that you can control your step later
        with:
          keyword: Trigger                  # This is the regex string to search in the comment
      - name: Some random method
        ...
        # You can have as many steps as you need - without "if:" clause, these will run unconditionally
        ...
      - name: Run when comvent matches
        run: |
          echo You see this step run only when comvent found the matching keyword in the comment event
        # This checks whether comvent found a match
        if: steps.comvent.outputs.comvent != ''
        # Comvent returns the following values
        #   if found -> "found"
        #   if not   -> ""
```
