# Shortcuty Import Helper

A helper for importing, managing, and tracking a large collection of liked shortcuts from Shortcuty, into the Shortcuts app. This uses a markdown export of your liked shortcuts for easy previewing, managing, and organizing to import them much easier than doing so manually. Includes various ways to customize the process you want to take.

This is for the most part useful for those who have a lot of liked shortcuts from Shortcuty that are not yet already added to the Shortcuts app, but already installed shortcut detection is included as well. Also helpful for giving a friend or another device your set of liked shortcuts. 

It isn't possible to make importing shortcuts fully automatic, the Shortcuts app doesn't and very likely will never support an action for the 'Add Shortcut' button. 
This shortcut automates everything beside that one manual button press step, while adding as much convenience to everything else. 

You will need to use a desktop browser for the liked shortcuts inventory export step. 

## Full Guide & Info

### 1. Install the shortcuts

Download and add both shortcuts to your Apple Shortcuts library:
- [Shortcuty Import Helper](shortcuty-import-helper.shortcut) — The main importer.
- [Shortcuty Import Helper Config](shortcuty-import-helper-config.shortcut) — Manages your settings and saved data.

The `.shortcut` files for both shortcuts are included in this repo.

Run 'Shortcuty Import Helper Config' once before using the main shortcut. It will create the necessary configuration and storage files in iCloud Drive > Shortcuts > Shortcuty Import Helper folder.

### 2. Export your liked shortcuts

On your computer:

1. Sign in to [Shortcuty](https://browse.shortcuty.app/) and open your [Liked Shortcuts](https://browse.shortcuty.app/liked-shortcuts) page.
2. Open your browser's Developer Tools (`ctrl + shift + I`) and switch to the Console tab.
3. Open [liked-shortcuts-extractor.js](liked-shortcuts-extractor.js) from this repository, use `ctrl + A` and copy the full script. 
4. Paste the script into the console and run it. 
   - Use "allow pasting" if console prevents you at first. 
   - **Understand that running scripts in console is never recommended if you haven't reviewed, created, or trust them!!** Malicious scripts ran in console can steal your data. 
     If you want peace of mind, run the [liked-shortcuts-extractor.js](liked-shortcuts-extractor.js) file through [VirusTotal](https://www.virustotal.com/gui/home/upload) and/or let AI scan it and tell you it's verdict. This script only extracts your shortcuts you've liked on Shortcuty and inserts them in the markdown it creates and downloads for you. 
5. Once finished, your browser will download `Shortcuty Liked Shortcuts.md`.

The extractor collects your liked shortcuts across the available pages, along with their names, descriptions, categories, installation links, and other available details.

### 3. Prepare your markdown inventory

If you want to organize the shortcuts you import into folders, or if you want to tell the Import Helper to ignore some of your liked shortcuts, then you should edit the markdown file accordingly first. You can do it yourself, or hand the markdown file to AI to organize how you want it. 

The helper doesn't create folders or move them into folders for you. The idea is to treat the `##` sections as the folders you want and what shortcuts should belong to them. Later, after you finish adding the imports for a section, you would select and add them to the corresponding folder you'd make for that section of shortcuts you just imported. Then move on to the next section of imports and repeat. 

If you don't care to organize by folders, you can always skip that step and just keep moving on to the next section of shortcuts to import or you can use the '[All sections]' option when starting an import session. 

#### Editing the markdown

As stated earlier, you can always just hand the file to AI to edit how you want. If you'd like to edit yourself or preview the inventory, open the exported `.md` file in a text editor, prefer a markdown editor such as [Hackmd](https://hackmd.io) if you want to preview/edit in browser, or [Obsidian](https://obsidian.md/) for local program on your computer and/or iPhone.

Your shortcuts are grouped into sections based on their assigned categories on Shortcuty. 
You can rename sections, reorganize shortcuts, and decide which ones you actually want to import.

Each shortcut starts off checked:

- `- [x]` — Include for importing
- `- [ ]` — Exclude from importing

Simply uncheck anything you don't want the helper to process.

You can also reorganize the `##` section headings however you'd like, or rename them as long as they stay as `##` headers. 

**Keep the shortcut entries, `##` sections, and the `Install:` links intact**, the helper expects them in the way they were created by the `liked-shortcuts-extractor.js`.
For reference, you can see [Expected Markdown Layout](dev/expected-markdown-layout.md).

### 4. Move your inventory to your iPhone

Save the ready `.md` file somewhere in the Files app on your iPhone.

### 5. Let the helper learn & remember your inventory

Choose 'Scan/rescan a markdown file' and select your prepared inventory from Files.

Once you've initially scanned your inventory, if you use 'Use current scanned markdown file' it will use the cached state of your markdown, thus making the rest load faster going forward.
Rescan if you've made changes to your markdown inventory or want to use a new one.

### 6. Start importing

After the initial scan, you can choose what to import:

| Option | What it does |
|---|---|
| **Individual section** | Import shortcuts from one section of your inventory. |
| **[All sections]** | Process every checked shortcut across all sections, in order. |
| **[Custom]** | Select specific shortcuts from one or multiple sections. |

You'll get a session overview before importing begins.

During each shortcut import, you will still need to manually tap 'Add Shortcut' to finish the import of each, there is no way around that which is why this is called an Import Helper. 
If you end a session early, whether by choice or accidentally, you can use 'Resume last session' the next time you run the helper.

#### Import Modes:

#### Guided Mode (Default/Recommended)
The helper asks before opening each next installation link. It will break for the set wait time (default 6 seconds) before the next import popup is displayed, giving you time to tap 'Add shortcut'. You can skip entries, request more time, or end/pause the session to optionally resume it later.

#### Automatic Mode 
Opens the next installation link after you return to the helper and the set wait time is reached (default 8 seconds).
This mode is less recommended as there won't be any options provided to skip, or request more time before proceeding to the next. It will just continuously open shortcuts links periodically until each shortcut in the line up is met, or if you end the shortcut. 
You can set a limit with the config shortcut to end the run when number of shortcuts is reached, and then resume the rest afterward. 
Don't use this mode if you think you may want to manually skip shortcuts. 

## Settings and saved data

Run 'Shortcuty Import Helper Config' whenever you want to change various preferences of the helper.
You can adjust import modes and delays, enable or disable installed-shortcut detection, control progress displays, and manage your saved catalog.

Your installation history is stored separately from the scanned catalog, so rescanning or replacing your markdown file won't erase that history.

**About installed-shortcut detection:** 
When you use 'Open installation' on a shortcut the helper will assume and record it as installed, even if you don't ultimately end up adding the shortcut after. 
Optional exact-name matching can also identify shortcuts already present in your library, but matching names aren't always proof they're the same shortcut.

You can change detection of "already installed" to only by exact-name matching if you wish, in the config. As well as review or clear saved data.

## For developers

The [`dev/`](dev/) directory contains the Cherri build scripts used to create both shortcuts, along with JSON templates and a sample markdown layout.

The shortcuts were developed using [Cherri Playground](https://github.com/electrikmilk/cherri).