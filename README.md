# Zookeeper

Zookeepr is an online animal directory for an imaginary zoo, where the user is able to see the list of animals and zookeepers and their characteristics as well as having the ability to add an either one with their information. Users are able to grab a list of animals and zookeepers through query searches tied to their name, personality, and much more. This is my first back end project using NodeJS and Express that is paired up with a front end.

This application does NOT use a database. <br/>
Data is written into a JSON file using FS.writeFile module, part of NodeJS.


### List of API routes built
- GET (ALL animals, ONE animal, ALL zookeepers, ONE zookeeper)
- POST (ONE animal, ONE zookeeper)

### Application Link/Installation

Link: https://zookeepers-cesar-s.herokuapp.com/ 

OR if downloaded locally:
1. Git clone or download the application and load on VSCode
2. Run 'npm install' in the Command Line for all necessary packages to install 
3. Run 'npm start' and navigate to browser to http://localhost:3002

### Screenshot of App

![Screenshot 1](/public/assets/images/sch-1.jpeg)