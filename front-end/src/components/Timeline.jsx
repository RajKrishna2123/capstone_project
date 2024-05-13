import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import '../styling.css'
import 'react-vertical-timeline-component/style.min.css'

const timelineData = [
  {
    id: 1,
    title: "Requirement Analysis",
    desc: "Gathering and analyzing the requirements and needs of the software.",
    date: "10th Feb",
  },
  {
    id: 2,
    title: "Design",
    desc: "Designing the software system, including system architecture and database design.",
    date: "22nd Feb",
  },
  {
    id: 3,
    title: "Implementation",
    desc: "Coding and building the software system.",
    date: "30 Mar",
  },
  {
    id: 4,
    title: "Testing",
    desc: "Testing the software system for defects and issues.",
    date: "20 Apr",
  },
  {
    id: 5,
    title: "Deployment",
    desc: "Deploying the software system into the production environment.",
    date: "1st May",
  },
  {
    id: 6,
    title: "Maintenance",
    desc: "Maintaining and updating the software system post-deployment.",
    date: "10th May",
  },
];

function Timeline() {
  return (
    <div>
    <div className=' text-5xl font-bold text-center m-8'>Our Timeline</div>
    <div className=''>
          <VerticalTimeline>
              {
                  timelineData.map(e => {
                      return (
                          <VerticalTimelineElement contentStyle={{ background: '#212534', borderRadius: 16}} 
                              contentArrowStyle={{ borderRight: '7px solid rgba(33, 150, 243,.6)'}}
                          key={e.id} date={e.date} dateClassName='text-gray-100'
                              iconStyle={e.id % 2 === 0 ?
                                  { background: '#5ddcff' } : { background: '#4e00c2' }}
                          >
                              <div className=''>
                                  <h3 className="text-xl font-bold">{e.title}</h3>
                                  <p>{e.desc}</p>
                              </div>
                          </VerticalTimelineElement>
                      )
                  })
              }
          </VerticalTimeline>
    </div>
    </div>
  )
}

export default Timeline
