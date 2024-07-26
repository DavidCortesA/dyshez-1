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

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    toast.error(error.message) 
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function getOrders() {
  const supabase = createClient()
  const { data: orders, error } = await supabase.from('orders').select('')

  return orders;
}

export async function getPictures() {
  const supabase = createClient()
  
  const { data , error } = await supabase.storage.listBuckets();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function uploadPicture(file) {
  const supabase = createClient();
  const uniqueName = `${uuidv4()}-${file.name}`;
  
  const { data, error } = await supabase.storage.from('pictures').upload(uniqueName, file);

  if (error) {
    console.error(error);
    return null;
  }

  return supabase.storage.from('pictures').getPublicUrl(uniqueName).publicUrl;
}
