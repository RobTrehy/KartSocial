import React from 'react';

interface Props {
    id: number,
}

export default function FeedFooter({ id }: Props) {

    return (
        <>
            {/* TODO: 
                 * Link to view this on profile?
                 * Like
                 * Comment
                 * Share?
                */}
            This is feed item with id: {id}
        </>
    )
}