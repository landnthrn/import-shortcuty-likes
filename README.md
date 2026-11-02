# Shortcuty Import Helper

A helper for importing, managing, and tracking a large collection of liked shortcuts from [Shortcuty](https://browse.shortcuty.app/), into the Shortcuts app. This uses a markdown export of your liked shortcuts for easy previewing, managing, and organizing to import them much easier than doing so manually. Includes various ways to customize the process you want to take.

**This is for the most part useful for:**  
- If you have a lot of liked shortcuts from Shortcuty, but not yet installed to Shortcuts  
- Organize a large collection into folders easier via starting with a simple markdown to edit & import accordingly  
- Giving your collection to a friend or another device  

The Shortcuts app doesn't and very likely never will support an action for the 'Add Shortcut' button. 
This shortcut automates everything beside that one inevitable manual button press, while adding as much convenience to everything else. 

You will need to use a desktop browser to export your liked shortcuts inventory.

> **Dev note:**   
> Shortcuty apparently offers an action for exporting liked shortcuts, but it was no where to be found on my device.

## Previews

<table>
  <tr>
    <th align="center">Main Menu</th>
    <th align="center">Config Menu</th>
    <th align="center">Next Installation Screen<br><em>(Guided Mode)</em></th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="250" alt="Main Menu" src="https://github.com/user-attachments/assets/4f42812a-6cc7-42f0-9d9f-00cf910a590b" />
    </td>
    <td align="center" valign="top">
      <img width="250" alt="Config Menu" src="https://github.com/user-attachments/assets/b64f830a-a1e7-4a2c-afce-6a84b3cfba66" />
    </td>
    <td align="center" valign="top">
      <img width="250" alt="Next Installation Screen (Guided Mode)" src="https://github.com/user-attachments/assets/7dd0cdbe-a0d0-4238-8a98-b357d7f1f1db" />
    </td>
  </tr>
</table>

### Demo Video

https://github.com/user-attachments/assets/a60a8270-312f-4c03-8620-24ac2122b05a

## Full Guide & Info

### 1. Install the shortcuts

Download and add both shortcuts to your Apple Shortcuts library:
- [Shortcuty Import Helper](https://www.icloud.com/shortcuts/8c5a1425b0c94208aa2dbb92f65c8e2d) — The main importer
- [Shortcuty Import Helper Config](https://www.icloud.com/shortcuts/b5f06b177f86428e8babd04db5df5d33) — Manages your settings and saved data

The `.shortcut` files for both are also included in this repo.

Run 'Shortcuty Import Helper Config' once before using the main shortcut. It will create the necessary configuration and storage files in iCloud Drive > Shortcuts > Shortcuty Import Helper folder.

### 2. Export your liked shortcuts

On your computer:

1. Sign in to [Shortcuty](https://browse.shortcuty.app/) and open your liked shortcuts page.
2. Open your browser's Developer Tools (`ctrl + shift + I`) and switch to the Console tab.
3. Open [liked-shortcuts-extractor.js](liked-shortcuts-extractor.js)from this repository, with notepad. Use `ctrl + A` and copy the full script. 
4. Paste the script into the console tab in dev tools and run it. 
   - Use "allow pasting" if console prevents you at first. 
   - **Understand that running scripts in console is never recommended if you haven't reviewed, created, or trust them!!** Malicious scripts ran in console can steal your data.   
     If you want peace of mind, run the `liked-shortcuts-extractor.js` file through [VirusTotal](https://www.virustotal.com/gui/home/upload) and/or let AI scan it and tell you it's verdict. This script only extracts your shortcuts you've liked on Shortcuty and inserts them in the markdown it creates and downloads for you. 
5. Once finished, your browser will download `Shortcuty Liked Shortcuts.md`.

The extractor collects your liked shortcuts across all liked pages, along with their names, descriptions, categories, installation links, and other available details.

### 3. (Optional) Prepare your markdown inventory

If you want to organize the shortcuts you import into folders, or to tell the Import Helper to ignore some of your liked shortcuts, then you should edit the markdown file accordingly first. You can do it yourself, or hand the markdown file to AI to organize how you want it. 

The helper doesn't create folders or move them into folders for you. The idea is to treat the `##` headers/sections as the folders you want and what shortcuts should belong to them.   
Later, after you finish adding imports for a section, you would select and add them to a corresponding folder you'd make for that section of shortcuts you just imported. Then move on to the next section of imports and repeat. 

If you don't care to organize by folders, you can always skip that step and just keep importing section after section, or use the '[All sections]' option.

#### Editing the markdown

As stated earlier, you can always let AI edit the markdown how you want. If you'd like to edit yourself or preview the inventory, open the exported `.md` file in a text editor, prefer a markdown editor such as [Hackmd](https://hackmd.io) if you want to preview/edit in browser, or [Obsidian](https://obsidian.md/) for local program on your computer and/or phone.

Your shortcuts are grouped into sections based on their assigned categories on Shortcuty.  
You can rename sections, reorganize shortcuts, and decide which ones you actually want to import.  

Each shortcut starts off checked:  

- `- [x]` — Include for importing
- `- [ ]` — Exclude from importing

Simply uncheck anything you don't want the helper to process.  

You can reorganize the `##` section headings however you'd like, or rename them as long as they stay as `##` headers.  

**Keep the shortcut entries, `##` sections, and the `Install:` URLs intact**, the helper expects them in the way they were created by the `liked-shortcuts-extractor.js`.  
For reference, you can see [Expected Markdown Layout](dev/expected-markdown-layout.md).

### 4. Move your inventory to your Apple device

Save the ready `.md` file somewhere in the Files app on your device.  

### 5. Let the helper learn & remember your inventory

Choose 'Scan/rescan a markdown file' and select your ready markdown file from Files.  

Once you've initially scanned your inventory, if you use 'Use current scanned markdown file' it will use the cached state of your markdown, thus making it load faster going forward.  
Rescan if you've made changes to your markdown inventory or want to use a new one.  

### 6. Start importing

After the initial scan, you can choose what to import:  

- **Individual section:** Import shortcuts from one section of your inventory at a time *(Recommended if you're planning to organize into folders after each section import)*  
- **All sections:** Process every `- [x]` checked shortcut across all sections, in order  
- **Custom:** Select specific shortcuts from one or more sections  

You'll get a session overview before importing begins.  
If you end a session early or accidentally do, you can use 'Resume last session' the next time you run the helper.

## Info

### Import Modes:

#### Guided Mode (Default/Recommended)
- The helper asks before opening each next installation link  
- It will break for the set wait time *(default 6 seconds)* before the next import popup is displayed, giving you time to tap 'Add shortcut'  
- Before each import you can skip, request more time, or end/pause the session to optionally resume it later  

#### Automatic Mode 
- Auto opens the next installation link everytime the set wait time is reached *(default 8 seconds)*  
- It will just continuously open a shortcut link periodically until each in the line up is met, or you end/pause the shortcut  
- You can set a limit with the config shortcut to end the run when number of imports is reached, and resume the rest after  
- This mode is less recommended as there won't be any options provided before each import  
- Don't use this mode if you think you may want to manually skip shortcuts  

### Settings and saved data

Run 'Shortcuty Import Helper Config' whenever you want to change various preferences of the helper.  
You can adjust import modes, delays, installed-shortcut detection, control progress displays, and manage your saved catalog.  

**About 'already installed shortcut' detection:** 
- An installation history builds as you import shortcuts. It is stored separately from the scanned catalog, so rescanning or replacing your markdown file won't erase that history.  
- By default, any shortcuts detected or recorded as installed will be skipped.  
- Installed history & already installed detection runs on two mechanisms:  
  1. When you use 'Open installation' on a shortcut the helper will assume and record it as installed, even if you don't ultimately end up adding the shortcut after.  
  2. Exact-name matching of shortcuts present in your library.  
  - Both are on by default, use the config shortcut if you want it different.  

## For developers

The shortcuts were developed using [Cherri Playground](https://github.com/electrikmilk/cherri). The [`dev/`](dev/) directory contains their Cherri build scripts. 
