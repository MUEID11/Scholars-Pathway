import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='space-y-6 my-24 text-center max-w-[700px] mx-auto px-4'>
            <h1 className='text-xl sm:text-3xl font-bold uppercase'>{heading}</h1>
            <p className=' text-gray-600 tracking-tight'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;