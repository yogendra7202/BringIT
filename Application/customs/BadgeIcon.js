import React from 'react'
import { Icon, withBadge } from "@rneui/themed";

const BadgeIcon = ({ name, size }) => {
    const BadgedIcon = withBadge(2)(Icon);

    return (
        <BadgeIcon name={name} type='font-awesome-5' color="#fff" size={size} />
    )
}

export default BadgeIcon