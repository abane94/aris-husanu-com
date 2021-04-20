import { Component, OnInit } from '@angular/core';


interface EducationItem {
  name: string;
  years: string;
  study: string;
}

interface WorkItem {
  title: string;
  company: string;
  city: string;
  years: string;
  desc?: string;
  points?: string[];
  projects?: { title: string, desc: string }[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  education: EducationItem[] = [
    { name: 'University of Wisconsin - Milwaukee', years: '2015 - 2018', study: 'Bachelor of Science: Computer Science' },
    { name: 'Michigan Technological University', years: '2013 - 2015', study: 'Software Engineering'},
    { name: 'Kettle Moraine High School', years: '2009 - 2013', study: 'General' }
  ];

  work = [
    {
      title: 'Software Engineer',
      company: 'AVL Test Systems Inc.',
      city: 'Plymouth, MI',
      years: '2019-Present',
      desc: '',
      points: ['Monitoring System for vehicle test cells', 'MEAN Stack with typescript backend', 'Implemented a team code review process'],
      projects:[ { title: 'Customizable Activity Dialog', desc: 'A configurable Angular module wrapped in an NPM package. That could be added to a custom Angular form app used to translate and collect data.'}]
    },
    {
      title: 'Product Development Intern',
      company: 'JDA Software (Now: Blue Yonder)',
      city: 'Waukesha, WI',
      years: '2017-2018',
      desc: '',
      points: ['Web platform to host apps for supply chain', 'Java/Spring backend', 'Javascript/EXTjs', 'Bug/Defect work'],
      projects: [{ title: 'Mobile Remote viewing system', desc: 'Implemented a Cordova plugin to remotely view an android device from a web client as part of senior capstone. Using: JavaScript, Angular, Material, Node, Express, Cordova, Java.' }]
    },
    {
      title: 'Software Development Intern',
      company: 'TechCanary (Now: Applied Systems)',
      city: 'Milwaukee, WI',
      years: '2016-2017',
      desc: '',
      points: ['Writing and testing code, discussing requirements', 'Learned Python on the job', 'Reading/mapping/writing CSV files, managing inconsistent data'],
      // projects: {title: '', desc: ''}
    },
    {
      title: 'Mobile App Developer (Founder)',
      company: 'ABane Apps',
      city: 'Waukesha, WI',
      years: '2010',
      desc: 'Android app published on the Google Play Store, The app uses trigonometry relations to find the remaining angles and side. This app is written in a RAD language based on Visual Basic',
      // points: [],
    }
  ]

  openEmail() {
    window.open('mailto:' + ['a', 'r', 'i', 's', '@', 'h', 'u', 's', 'a', 'n', 'u', '.', 'c', 'o', 'm'].join(''));
  }

  openPhone() {
    window.open('tel:' + ['1','2','6','2','8','9','4','3','0','0','4'].join(''));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
