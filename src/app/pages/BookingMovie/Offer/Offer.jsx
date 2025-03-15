import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, InputNumber, Typography, Space } from 'antd';

const combos = [
    {
        id: 1,
        name: "iCombo 1 Big Extra STD",
        description: "01 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack",
        price: 109000,
        image: "https://example.com/combo1.jpg", // Replace with actual image URL
    },
    {
        id: 2,
        name: "iCombo 2 Big Extra STD",
        description: "02 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack",
        price: 129000,
        image: "https://example.com/combo2.jpg", // Replace with actual image URL
    },
    {
        id: 3,
        name: "iCombo 1 Big STD",
        description: "01 Ly nước ngọt size L + 01 Hộp bắp",
        price: 89000,
        image: "https://example.com/combo3.jpg", // Replace with actual image URL
    },
    {
        id: 4,
        name: "iCombo 2 Big STD",
        description: "02 Ly nước ngọt size L + 01 Hộp bắp",
        price: 109000,
        image: "https://example.com/combo4.jpg", // Replace with actual image URL
    },
    {
        id: 5,
        name: "iFood Combo 1",
        description: "1 Bánh Burger Gà/Bò + 1 Nước 27oz/Lipton 27oz/Suối/Pepsi Lime Lon",
        price: 179000,
        image: "https://example.com/combo5.jpg", // Replace with actual image URL
    },
];

export default function Offer() {
    const [quantities, setQuantities] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    const handleQuantityChange = (comboId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [comboId]: value,
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    Chọn Combo
                </Typography.Title>

                {/* List of Combos */}
                <List
                    itemLayout="horizontal"
                    dataSource={combos}
                    renderItem={(combo) => (
                        <List.Item
                            key={combo.id}
                            actions={[
                                <Space>
                                    <InputNumber
                                        min={0}
                                        value={quantities[combo.id]}
                                        onChange={(value) => handleQuantityChange(combo.id, value)}
                                        style={{ width: '100px' }}
                                    />
                                    <Typography.Text>
                                        {quantities[combo.id]} Combo(s)
                                    </Typography.Text>
                                </Space>,
                                <Typography.Text strong>{combo.price.toLocaleString()} đ</Typography.Text>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<img alt={combo.name} src={combo.image} style={{ width: 64, height: 64, objectFit: 'cover' }} />}
                                title={combo.name}
                                description={combo.description}
                            />
                        </List.Item>
                    )}
                />

                {/* Button to proceed to booking */}
                <div className="mt-8" style={{ textAlign: 'center' }}>
                    <Link to="/booking/payment">
                        <Button type="primary" size="large" style={{ width: '100%' }}>
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
