'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { toast } from 'react-hot-toast' 
import { v4 as uuidv4 } from 'uuid'

import { createClient } from './supabase/server'

export async function login(email, password) {
  const supabase = createClient();

  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    toast.error("Invalid credentials")
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function signup(email, password) {
  const supabase = createClient()

  const data = {
    email: email,
    password: password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log();(error.message) 
  }

  redirect('/')
}

export async function getOrders() {
  const supabase = createClient()
  const { data: orders, error } = await supabase.from('orders').select('')

  return orders;
}

export async function getPictures() {
  const supabase = createClient()
  
  const { data , error } = await supabase.storage.getBucket('Pictures');

  if (error) {
    toast.error(error.message);
  }

  return data;
}

export async function postPicture(file) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from('Pictures').upload(uuidv4(), file);

  if(error){
    toast.error(error.message)
  }
  
  return data
}