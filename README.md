# Purpose of the application
To create a website where the user can track the time spent on any project. The user can create projects, time entries and labels. Comments can also be added to the time entries, which makes it easier to write a report later. Labels can be used to indicate the status of a project or its belonging to a category.

# How the application works
After opening the page, the user is presented with a calendar for the given week, where they can see in daily breakdown how much time they have spent on each project. Here they can add projects to the given week, edit or delete existing entries, or add comments to them. (See Weekly view.png)

In the left menu, you can switch between the weekly and project summary views. When you switch to the project view, you can see a list of projects with their statuses, priorities and other labels. (See Project view.png)

There is a button at the bottom to create a new project. Clicking on this or an existing project will open a window where you can edit the data for the given project or fill it in if you are creating a new one. If you already have one, you can even delete it here. (See Project editing view.png)

# Entity structure
- Time
- Date
- Start time
- Finish time*
- Connecting project
- Notes*

- Project
- Name
- Hours spent in total
- Status*
- Priority*
- Tags*
- Task description*

* *not mandatory to fill out

Figma project: https://www.figma.com/design/WQOG9FPwh4NhqXK9Eneo3E/Szerver-oldali?node-id=0-1&t=P5ZIegcKyLMZJbSt-1

# Enhancement options:
- Time measurement
- Timesheet export as excel
- Login and users
- Pop-ups instead of new windows (add and edit)
- Encryption
- Separate page for editing statuses, priorities, tags
- Better implemented UI
- Search
- Canban board
- Filtering and summarizing by tag
