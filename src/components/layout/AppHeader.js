import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
const headerStyle = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
}
//const handleChange = (value)=> {
        //console.log(`selected ${value}`)

//};const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };



function AppHeader (){
   const [select, setSelect] = useState(false);
    const {crypto}=useCrypto();
    const [modal, setModal] = useState(false);
    const [coin, setCoin]=useState(null);
    const [drawer, setDrawer]=useState(true);

   useEffect(()=> {
       const keypress= event =>{
            if(event.key === '/'){
                setSelect((prev) => !prev)
            }
       }
       document.addEventListener('keypress',keypress)
       return ()=> document.removeEventListener('keypress',keypress)
   },[])

function handleSelect(value){
    console.log(value);
    setModal(true);
    setCoin(crypto.find(c => c.id === value))
}

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 250,
                }}
                open={select}
                value="press / to open"
                onSelect={handleSelect}
                onClick={()=> setSelect((prev) => !prev) }

                options={crypto.map(coin => ({
                    label:coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width:20}} src={option.data.icon} alt={option.data.label} />{option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={()=> setDrawer(true)}>Add Asset</Button>

            <Modal open={modal} 
                   onCancel={()=> setModal(false)}
                   footer={null}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer width={600}
                    title="Add Assets"
                    onClose={()=> setDrawer(false)}
                    open={drawer}
                    destroyOnClose
            >
            <AddAssetForm onClose={()=> setDrawer(false)}/>
            </Drawer>

        </Layout.Header>
    );
}

export default AppHeader;