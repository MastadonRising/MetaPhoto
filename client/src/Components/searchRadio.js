import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const sortByRating = () => {
    console.log('yay')
}

const searchRefiner = () => (
  <Checkbox label='Sort by Rating' onClick={sortByRating} />
)

export default searchRefiner