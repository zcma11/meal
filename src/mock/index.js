import Mock from 'mockjs'
import { food, comment, category, supports } from './data'
import { randomArr, randomPhone, randomOneObjToMoreObj } from './random'

const Random = Mock.Random
Random.cparagraph(2)


function produce () {
  const youhui = {
    category: '优惠',
    icon: 'https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png',
    food: randomArr(food, 5, 8)
  }
  
  const zhekou = {
    category: '折扣',
    icon: 'https://fuss10.elemecdn.com/0/6a/05b267f338acfeb8bd682d16e836dpng.png',
    food: randomArr(food, 3, 6)
  }
  
  
  
  const info = {
    description: '硅谷专送',
    'deliveryTime|25-35': 28,
    serviceScore: 4.1,
    foodScore: 4.3,
    rankRate: 69.2,
    minPrice: 20,
    deliveryPrice: 4,
    ratingCount: 24,
    'sellCount|90-1000': 90,
    bulletin: '@cparagraph(2)',
    support: randomArr(supports, 3, 6),
    avatar: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
    bgImg: 'https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png',
    pics: [
      'https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg',
      'https://fuss10.elemecdn.com/6/82/2cd3d681f5e93292b3eb49d6b412ajpeg.jpeg',
      'https://fuss10.elemecdn.com/8/93/4cf527b6462eea634f69755374f88jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/f2/2a8796ba025a5773fd685a95ac369jpeg.jpeg',
      'https://fuss10.elemecdn.com/a/c4/5a78f477fd616a51ce33586a76ddbjpeg.jpeg'
    ],
    phone: randomPhone()
  }

  function randomOneObjToMoreObj (n, m) {
    let count
    if (m) {
      if (n > m) return
      count = Math.ceil(Math.random() * (m - n + 1)) + (m - n)
    } else {
      count = n
    }
    const goods2 = []
    while (goods2.length < count) {
      goods2.push({
        category: randomArr(category, 1)[0],
        food: randomArr(food, 3, 5)
      })
    }
    return goods2
  }
  
  // 最后发送的data
  const data = {
    info: info,
    goods: [
      youhui,
      zhekou,
      ...randomOneObjToMoreObj(4, 7)
    ],
    comment: randomArr(comment, 12, 20)
  }

  return data
}

setInterval(() => {
  Mock.mock('/goods', { code: 0, data: produce().goods })
  Mock.mock('/info', { code: 0, data: produce().info })
  Mock.mock('/appraise', { code: 0, data: produce().comment })
}, 1000);

