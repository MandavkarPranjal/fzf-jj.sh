# fzf-jj.sh

bash, zsh, and fish key bindings for [jj], powered by [fzf]

> [!NOTE]
> This is under production, and it will be opiniated on what it will support

## Features

- **📚 Bookmarks** - Browse and select bookmarks with preview
- **📡 Remotes** - Manage git remotes integration
- **🌐 Browser Integration** - Open selected items in your browser (GitHub/GitLab)

## Installation

1. **Download the script:**
   ```bash
   curl -o ~/.local/bin/fzf-jj.sh https://raw.githubusercontent.com/mandavkarpranjal/fzf-jj.sh/main/fzf-jj.sh
   chmod +x ~/.local/bin/fzf-jj.sh
   ```

2. **Source it in your shell config:**

   **Bash** (~/.bashrc):
   ```bash
   source ~/.local/bin/fzf-jj.sh
   ```

   **Zsh** (~/.zshrc):
   ```bash
   source ~/.local/bin/fzf-jj.sh
   ```

OR

Source (fzf-git.sh)[https://raw.githubusercontent.com/mandavkarpranjal/fzf-jj.sh/main/fzf-jj.sh] file from your .bashrc or .zshrc

## Requirements

- **[jj]** - Jujutsu VCS installed and available in PATH
- **[fzf]** - Fuzzy finder
- **bash** or **zsh** - Shell support for both

Optional:
- **bat** or **batcat** - For colored previews (falls back to cat)
- **git** - For remote URL parsing when using browser integration

[jj]: https://github.com/jj-vcs/jj
[fzf]: https://github.com/junegunn/fzf
## Key Bindings

After sourcing the script, use `CTRL-J` prefix for all commands:

| Binding | Action |
|---------|--------|
| <kbd>CTRL-J</kbd> | Show this list of bindings |
| <kbd>CTRL-J</kbd><kbd>CTRL-B</kbd> | Open bookmarks picker |
| <kbd>CTRL-J</kbd><kbd>CTRL-R</kbd> | Open remotes picker |
| <kbd>CTRL-J</kbd><kbd>CTRL-H</kbd> | Open Change/Revision picker |

> [!WARNING]
> The preview of Change/Revision picker is broken for Change ID of same initials

Both <kbd>CTRL-J</kbd><kbd>key</kbd> and <kbd>CTRL-J</kbd><kbd>CTRL-<key></kbd> work (e.g., <kbd>CTRL-J</kbd><kbd>B</kbd> and <kbd>CTRL-J</kbd><kbd>CTRL-B</kbd>).
