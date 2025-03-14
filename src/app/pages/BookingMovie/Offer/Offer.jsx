import React, { useEffect, useState } from 'react';
import './Offer.css';




 const ComboFood = [
    { Id: 1, Name: 'Combo 1', Detail: '1 Popcorn + 1 Pepsi', Price: 35000 },
    { Id: 2, Name: 'Combo 2', Detail: '1 Popcorn + 2 Pepsi', Price: 50000 },
    { Id: 3, Name: 'Combo 3', Detail: '2 Popcorn + 2 Pepsi', Price: 70000 },
    { Id: 4, Name: 'Combo 4', Detail: '3 Popcorn + 2 Pepsi', Price: 90000 },
];

 export default function Offer(props) {

    const [ChosenFood, setChosenFood] = useState([]);
    useEffect(() => {
        props.onFoodChange(ChosenFood);
    }, [ChosenFood]);

    const AddFood = (Id) => {
        setChosenFood(prev => [...prev, Id]);
    }

    const SubtractFood = (Id) => {
        const index = ChosenFood.findIndex(item => item === Id);
        if (index !== -1) {
            setChosenFood(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    }

    return (
        <div className='bookingfood-container'>
            <h2>Choose Combo</h2>
            {ComboFood.map((food, index) => (
                <div key={index} className='food-item'>
                    <div className='img-detail'>
                        <img src="https://cdn.galaxycine.vn/media/2025/2/24/interstellar-2_1740384209787.jpg" alt='ComboFood'></img>
                        <div className='detail'>
                            <h3>{food.Name}</h3>
                            <p>{food.Detail}</p>
                            <p>Price: {food.Price} VND</p>
                        </div>
                    </div>
                    <div className='button'>
                        <button className='btn' onClick={() => SubtractFood(food.Id)}>-</button>
                        <span style={{ backgroundColor: ChosenFood.filter(chosen => chosen === food.Id).length !== 0 ? '#dc3545' : '' }}>
                            {ChosenFood.filter(chosen => chosen === food.Id).length}
                        </span>
                        <button className='btn' onClick={() => AddFood(food.Id)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    )
}



// Đây là component hiển thị ra các combo bắp nước 💕