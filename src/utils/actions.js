'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './supabase/server'

export async function login(email, password) {
  const supabase = createClient();

  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Invalid credentials")
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function signup(userInfo) {
  const supabase = createClient()

  const { name, lastName, phone, email, celphone, webSite, password } = userInfo;

  const data = {
    email: email,
    password: password 
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error(error.message) 
    return;
  }

  const { data: users, error: profileError } = await supabase
    .from('users')
    .insert({
      name,
      lastName,
      phone,
      celphone,
      webSite,
    })

  if (profileError) {
    console.error(profileError.message)
    return;
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
  
  const { data , error } = await supabase.storage.from('pictures').list('');

  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function postPicture({ name, base64Data }) {
  const supabase = createClient();

  try {
    // Decode the base64 data
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');

    const { data, error } = await supabase.storage
      .from('pictures')
      .upload(name, buffer, { contentType: 'image/jpeg' }); // Adjust contentType if needed

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    console.log(data);

    return { name: name, url: data.Key };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}


export async function deletePicture(fileName) {
  const supabase = createClient();

  try {
    const { error } = await supabase.storage
      .from('pictures')
      .remove([fileName]);

    if (error) {
      console.error('Error deleting file:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

