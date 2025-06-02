'use server'
import { createClient } from '@/lib/server'
import { randomUUID } from 'crypto'
import sharp from 'sharp'

/* 画像をアップロードし、アップロード後のurlを取得する */
export async function uploadImageAction(file: File) {
    const supabase = await createClient()
    const bucketName = 'problem-img'
    const filepath = `${randomUUID()}.webp`

    // File から Buffer を取得
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // sharpでリサイズ
    const resizedBuffer = await sharp(buffer)
        .resize({ width: 600,height: 450,fit:"inside"})
        .webp({ quality: 80 })
        .toBuffer()

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(filepath, resizedBuffer, {
            cacheControl: '3600',
            contentType: 'image/webp',
        })

    if (error) {
        console.error('Error uploading image:', error)
        return { success: false, error: error.message }
    }

    // 画像のURLを取得
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filepath)
    const url = data.publicUrl

    return { success: true, url }
}