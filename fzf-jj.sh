#!/usr/bin/env bash

# shellcheck disable=SC2039
[[ $0 == - ]] && return

__fzf_jj_color() {
  if [[ -n $NO_COLOR ]]; then
    echo never
  elif [[ $# -gt 0 ]] && [[ -n $FZF_JJ_PREVIEW_COLOR ]]; then
    echo "$FZF_JJ_PREVIEW_COLOR"
  else
    echo "${FZF_JJ_COLOR:-always}"
  fi
}

__fzf_jj_pager() {
  local pager
  pager="${FZF_JJ_PAGER:-${GIT_PAGER:-$(git config --get core.pager 2> /dev/null)}}"
  echo "${pager:-cat}"
}

if [[ $1 == --list ]]; then
  shift
  if [[ $# -eq 1 ]]; then
    case "$1" in
       bookmarks)
         echo 'CTRL-O (open in browser)'
         jj bookmark list -a --color=$(__fzf_jj_color) 2>/dev/null | awk '
           {
             plain = $0; gsub(/\x1b\[[0-9;]*m/, "", plain)
           }
           plain ~ /^[^[:space:]]/ { bookmark = plain; sub(/:.*/, "", bookmark); print }
           plain ~ /^[[:space:]]+@/ && plain !~ /^[[:space:]]+@git/ {
             match(plain, /@[^:[:space:]]+/)
             remote = substr(plain, RSTART+1, RLENGTH-1)
             print bookmark "@" remote substr($0, index($0, ":"))
           }
         ' || true
         ;;
       remotes)
        echo 'CTRL-O (open in browser)'
        jj git remote list 2>/dev/null || true
        ;;
      *) exit 1 ;;
    esac
  elif [[ $# -gt 1 ]]; then
    set -e

    # Get current bookmark/branch for browser URL
    current_bookmark=$(jj bookmark list --color=never | grep -E '^\s*\*' | awk '{print $2}' 2>/dev/null || echo 'HEAD')

    case "$1" in
      bookmark)
        bookmark_name=$(echo "$2" | awk '{print $1}' | sed 's/:$//')
        ;;
      revision)
        revision=$(echo "$2" | awk '{print $1}')
        ;;
      remote)
        remote=$2
        ;;
      *) exit 1 ;;
    esac

    # Get git remote URL if jj is coexisting with git
    remote_url=$(git remote get-url origin 2>/dev/null || echo "")

    if [[ -z $remote_url ]]; then
      exit 1
    fi

    if [[ $remote_url =~ ^git@ ]]; then
      url=${remote_url%.git}
      url=${url#git@}
      url=https://${url/://}
    elif [[ $remote_url =~ ^http ]]; then
      url=${remote_url%.git}
    else
      exit 1
    fi

    case "$1" in
      revision)
        path="/commit/$revision"
        ;;
      bookmark)
        path="/tree/$bookmark_name"
        ;;
    esac

    case "$OSTYPE" in
      darwin*)
        open "$url$path"
        ;;
      msys)
        start "$url$path"
        ;;
      linux*)
        if uname -a | grep -i -q Microsoft && command -v powershell.exe; then
          powershell.exe -NoProfile start "$url$path"
        else
          xdg-open "$url$path"
        fi
        ;;
      *)
        xdg-open "$url$path"
        ;;
    esac
    exit 0
  fi
fi

if [[ $- =~ i ]] || [[ $1 = --run ]]; then # ----------------------------------

if [[ $__fzf_jj_fzf ]]; then
  eval "$__fzf_jj_fzf"
else
  # Redefine this function to change the options
  _fzf_jj_fzf() {
    fzf --height 50% --tmux 90%,70% \
      --layout reverse --multi --min-height 20+ --border \
      --no-separator --header-border horizontal \
      --border-label-pos 2 \
      --color 'label:blue' \
      --preview-window 'right,50%' --preview-border line \
      --bind 'ctrl-/:change-preview-window(down,50%|hidden|)' "$@"
  }
fi

_fzf_jj_check() {
  jj status > /dev/null 2>&1 && return

  [[ -n $TMUX ]] && tmux display-message "Not in a jj repository"
  return 1
}

__fzf_jj=${BASH_SOURCE[0]:-${(%):-%x}}
__fzf_jj=$(readlink -f "$__fzf_jj" 2> /dev/null || /usr/bin/ruby --disable-gems -e 'puts File.expand_path(ARGV.first)' "$__fzf_jj" 2> /dev/null)

_fzf_jj_bookmarks() {
  _fzf_jj_check || return

  bash "$__fzf_jj" --list bookmarks |
  _fzf_jj_fzf --ansi \
    --border-label '📚 Bookmarks ' \
    --header-lines 1 \
    --tiebreak begin \
    --preview-window down,border-top,40% \
    --color hl:underline,hl+:underline \
    --no-hscroll \
    --bind 'ctrl-/:change-preview-window(down,70%|hidden|)' \
    --bind "ctrl-o:execute-silent:bash \"$__fzf_jj\" --list bookmark {1}" \
    --preview "jj log --color=$(__fzf_jj_color .) -r ::\$(echo {1} | sed 's/\[[0-9;]*m//g; s/:$//') --limit 10" "$@" |
  grep -oE '^[^:]+' | head -1
}

_fzf_jj_remotes() {
  _fzf_jj_check || return

  jj git remote list |
  _fzf_jj_fzf \
    --border-label '📡 Remotes ' \
    --header 'CTRL-O (open in browser)' \
    --preview-window right,70% \
    --bind "ctrl-o:execute-silent:bash \"$__fzf_jj\" --list remote {1}" \
    --preview "jj log --color=$(__fzf_jj_color .) --limit 10" "$@" |
  awk '{print $1}' | head -1
}

_fzf_jj_history() {
  _fzf_jj_check || return

  jj log -T 'change_id.short() ++ " " ++ description.first_line()' --color=$(__fzf_jj_color) -r '::' --limit 50 |
  _fzf_jj_fzf --ansi \
    --border-label '🔀 Changes ' \
    --header 'CTRL-O (open in browser)' \
    --preview-window right,70% \
    --bind "ctrl-o:execute-silent:bash \"$__fzf_jj\" --list revision \$(echo {} | grep -oE '[a-z]{12}' | head -1)" \
    --preview "jj show --color=$(__fzf_jj_color .) \$(echo {} | grep -oE '[a-z]{12}' | head -1) | $(__fzf_jj_pager)" "$@" |
  grep -oE '[a-z]{12}' | head -1
}

_fzf_jj_list_bindings() {
  cat <<'EOF'

CTRL-J ? to show this list
CTRL-J CTRL-B for Bookmarks
CTRL-J CTRL-H for History (changes)
CTRL-J CTRL-R for Remotes
EOF
}

fi # --------------------------------------------------------------------------

if [[ $1 = --run ]]; then
  shift
  type=$1
  shift
  eval "_fzf_jj_$type" "$@"

elif [[ $- =~ i ]]; then # ------------------------------------------------------
if [[ -n "${BASH_VERSION:-}" ]]; then
  __fzf_jj_init() {
    bind -m emacs-standard '"\er":  redraw-current-line'
    bind -m emacs-standard '"\C-z": vi-editing-mode'
    bind -m vi-command     '"\C-z": emacs-editing-mode'
    bind -m vi-insert      '"\C-z": emacs-editing-mode'

    local o c
    for o in "$@"; do
      c=${o:0:1}
      if [[ $c == '?' ]]; then
        bind -x "\"\C-j$c\": _fzf_jj_list_bindings"
        continue
      fi
      bind -m emacs-standard '"\C-j\C-'$c'": " \C-u \C-a\C-k`_fzf_jj_'$o'`\e\C-e\C-y\C-a\C-y\ey\C-h\C-e\er \C-h"'
      bind -m vi-command     '"\C-j\C-'$c'": "\C-z\C-j\C-'$c'\C-z"'
      bind -m vi-insert      '"\C-j\C-'$c'": "\C-z\C-j\C-'$c'\C-z"'
      bind -m emacs-standard '"\C-j'$c'":    " \C-u \C-a\C-k`_fzf_jj_'$o'`\e\C-e\C-y\C-a\C-y\ey\C-h\C-e\er \C-h"'
      bind -m vi-command     '"\C-j'$c'":    "\C-z\C-j'$c'\C-z"'
      bind -m vi-insert      '"\C-j'$c'":    "\C-z\C-j'$c'\C-z"'
    done
  }
elif [[ -n "${ZSH_VERSION:-}" ]]; then
  __fzf_jj_join() {
    local item
    while read -r item; do
      echo -n -E "${(q)${(Q)item}} "
    done
  }

  __fzf_jj_init() {
    setopt localoptions no_glob
    local m o
    for o in "$@"; do
      if [[ ${o[1]} == "?" ]]; then
        eval "fzf-jj-$o-widget() { zle -M '$(_fzf_jj_list_bindings)' }"
      else
        eval "fzf-jj-$o-widget() { local result=\$(_fzf_jj_$o | __fzf_jj_join); zle reset-prompt; LBUFFER+=\$result }"
      fi
      eval "zle -N fzf-jj-$o-widget"
      for m in emacs vicmd viins; do
        eval "bindkey -M $m '^j^${o[1]}' fzf-jj-$o-widget"
        eval "bindkey -M $m '^j${o[1]}' fzf-jj-$o-widget"
      done
    done
  }
fi
__fzf_jj_init bookmarks history remotes '?list_bindings'

fi # --------------------------------------------------------------------------
