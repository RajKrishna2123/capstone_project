import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import '../styling.css'
import 'react-vertical-timeline-component/style.min.css'

const timelineData = [
    {
        id: 1, title: "Initiation", desc: "Feasibility and market demand were assessed, leading to the conclusion and finalization of the development process.", date:"10th Feb"},
    {
    id: 2, title: "Planning", desc: "Detailed project plans created, including development of flowcharts and design strategies.", date:"22nd Feb"},
    {
    id: 3, title: "Execution", desc: "Project tasks are performed, and the project plan is put into action.", date:"30 Mar"},
    {
    id: 4, title: "Optimization", desc: "Analysis of AI models for best efficient models so that it becomes a deployableApplication", date:"20 Apr"},
    {
    id: 5, title: "Closure", desc: "Documenting deliverables, conducting reviews, transitioning outcomes.", date:"1st May"},
]

function Timeline() {
  return (
    <div>
    <div className=' text-5xl font-bold text-center m-8'>Team Overview and Contributors</div>
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
