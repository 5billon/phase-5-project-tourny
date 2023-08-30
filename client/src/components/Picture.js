import React from 'react'
import { usePictureContext } from './PictureContext'

function Picture() {
    const { isPictureVisable } = usePictureContext()
    return (
        <div>
            {isPictureVisable && (
                <img src='https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg' alt='' />
            )}
        </div>
    )
}

export default Picture