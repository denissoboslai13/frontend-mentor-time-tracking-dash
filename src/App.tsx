import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import imgJeremy from '../images/image-jeremy.png'
import iconEllipsis from '../images/icon-ellipsis.svg'
import iconWork from '../images/icon-work.svg'
import iconPlay from '../images/icon-play.svg'
import iconStudy from '../images/icon-study.svg'
import iconExercise from '../images/icon-exercise.svg'
import iconSocial from '../images/icon-social.svg'
import iconSelfCare from '../images/icon-self-care.svg'
import { AnimatePresence, motion } from 'motion/react'
import backupData from '../db.json'

const Categories = ({ title, icon, timeframes, color, time }) => {
  return (
      <div className='h-full flex flex-col w-full'>
        <div className='rounded-xl flex flex-col items-end overflow-hidden relative w-full h-15' style={{backgroundColor: color}}>
          <img src={icon} alt="icon-work" className='absolute -top-3 right-3' />
        </div>
        <div className='bg-[#1c1f4a] hover:bg-[#34397b] duration-300 flex flex-col p-6 rounded-xl -mt-7 lg:-mt-5 relative flex-grow'>
          <div className='flex flex-col justify-between items-start'>
            <p className='text-white lg:mb-7'>{title}</p>
            <AnimatePresence mode='wait'>
              <motion.div
              key={`${time}-current`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}>
                <p className='text-3xl lg:text-6xl text-white font-light'>{time === 'day' ? timeframes.daily.current : time === 'week' ? timeframes.weekly.current : timeframes.monthly.current}hrs</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className='absolute right-7 top-8'>
            <img src={iconEllipsis} alt="icon-ellipsis" />
          </div>
          <AnimatePresence mode='wait'>
            <motion.div className='absolute bottom-7 right-7 lg:left-7'
              key={`${time}-current`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}>
              <p className='text-sm text-[#bdc1ff]'>{time === 'day' ? 'Yesterday' : `Last ${time}`} - {time === 'day' ? timeframes.daily.previous : time === 'week' ? timeframes.weekly.previous : timeframes.monthly.previous}hrs</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
  )
}

const icons = [iconWork, iconPlay, iconStudy, iconExercise, iconSocial, iconSelfCare]
const colors = ['#ff8c66', '#56c2e6', '#ff5c7c', '#4acf81', '#7536d3', '#f1c65b']

function App() {
  const [categories, setCategories] = useState(0)
  const [time, setTime] = useState('day')
  const [live, setLive] = useState(false)

  useEffect(() => {
    axios
    .get('https://frontend-mentor-time-tracking-dash-production.up.railway.app/categories')
    .then(response => { 
      console.log(response)
      setCategories(response.data)
      console.log('successful')
      setLive(true)
    })
    .catch(
      error => {
        console.log(error)
        console.log('unsuccessful')
        setCategories(backupData.categories)
        setLive(false)
      }
    )
  }, []);

  console.log('backup: ', backupData.categories)

  return (
    <div className='w-full flex justify-center align-center lg:mt-20'>
      <div className='flex flex-col lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr] lg:grid-rows-2 justify-center items-center p-5 gap-6 w-full min-w-[375px] max-w-[1050px]'>
        <div className='lg:row-span-2 lg:col-span-1 h-full w-full'>
          <div className='bg-[#5847eb] p-6 flex flex-row lg:flex-col lg:items-start lg:gap-8 items-center gap-4 rounded-xl relative z-999 lg:pb-20'>
            <div className='w-[58px] lg:w-[80px] rounded-full border-2 border-white'>
              <img src={imgJeremy} alt="image-jeremy" />
            </div>
            <div>
              <p className='text-lg lg:text-lg text-[#bdc1ff] font-extralight'>Report for</p>
              <p className='text-2xl lg:text-5xl text-white font-light'>Jeremy Robson</p>
            </div>
            <div className={`${live === false ? 'bg-red-600' : 'bg-green-600'} absolute w-[10px] h-[10px] rounded-full right-6 top-6 border border-white`}>

            </div>
          </div>
          <div className='bg-[#1c1f4a] flex flex-row lg:flex-col gap-5 justify-evenly lg:justify-start rounded-xl py-10 pb-5 lg:pb-6 lg:pt-10 lg:px-6 -mt-5 z-10 relative text-[#6f76c8]'>
            <p className={`${time === 'day' ? 'text-[#bdc1ff]' : ''} hover:cursor-pointer hover:text-white duration-300`} onClick={() => setTime('day')}>Daily</p>
            <p className={`${time === 'week' ? 'text-[#bdc1ff]' : ''} hover:cursor-pointer hover:text-white duration-300`} onClick={() => setTime('week')}>Weekly</p>
            <p className={`${time === 'month' ? 'text-[#bdc1ff]' : ''} hover:cursor-pointer hover:text-white duration-300`} onClick={() => setTime('month')}>Monthly</p>
          </div>
        </div>
        
        {categories && (
          categories.map((c, index) => (
            <Categories key={c.id} title={c.title} icon={icons[index]} timeframes={c.timeframes} color={colors[index]} time={time}/>
          ))
        )}
      </div>
    </div>
  )
}

export default App
