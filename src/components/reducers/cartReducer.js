//use Redux to manipulate data

import table from '../../images/table.jpg'
import stool from '../../images/stool.jpg'
import lights from '../../images/lights.jpg'
import plant from '../../images/plant.jpg'
import pot from '../../images/pot.jpg'
import chair from '../../images/chair.jpg'
import { ADD_TO_CART, REMOVE_ITEM,ADD_QUANTITY, SUB_QUANTITY, ADD_SHIPPING } from '../actions/types/cart-actions-types'

const initialState = {
    items: [
        {id:1,title:'Chair', desc: "From fun (and comfy) swivel chairs for your office, cosy armchairs, that eye-catching accent chair and stylish dining seating - we have them all", price:110,img:chair},
        {id:2,title:'Pot', desc: "A flowerpot, flower pot, planter, planterette, or alternatively plant pot is a container in which flowers", price:80,img: pot},
        {id:3,title:'Plant', desc: "Plants are mainly multicellular organisms, predominantly photosynthetic eukaryotes of the kingdom Plantae",price:10,img: plant},
        {id:4,title:'Light', desc: "LED rotating lights", price:50,img:lights},
        {id:5,title:'Stool', desc: "here are seven types of stools (faeces) according to the Bristol Stool Chart.", price:100,img: stool},
        {id:6,title:'Table', desc: "A piece of furniture with a flat top and one or more legs;",price:230,img: table}
    ],
    addedItems: [],
    total: 0
}

const cartReducer = (state = initialState, action) => {
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        
        //check if the action id exists in the addedItems
       let existed_item= state.addedItems.find(item=> action.id === item.id)
       if (existed_item) {
           addedItem.quantity += 1 
            return{
                ...state,
                total: state.total + addedItem.price 
            }
        } else {
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + addedItem.price 
          return {
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
            }     
      }
    }

    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
       //INSIDE CART COMPONENT
    if(action.type === ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type === SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    if(action.type === ADD_SHIPPING){
        return{
            ...state,
            total: state.total + 6
        }
    }

    if(action.type === 'SUB_SHIPPING'){
      return{
          ...state,
          total: state.total - 6
    }
    } 
    else {
        return state
    }
}

export default cartReducer
