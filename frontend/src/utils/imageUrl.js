/**
 * Optimizes Cloudinary image URLs with automatic format, quality, and width limits.
 * Non-Cloudinary or local URLs are returned unchanged.
 *
 * @param {string} url - Original image URL
 * @param {{ width?: number }} [options] - Transformation options
 * @returns {string} Optimized or original image URL
 */
export function getOptimizedImageUrl(url, { width = 800 } = {}) {
  if (!url || typeof url !== 'string') return url;

  const uploadSegment = '/image/upload/';
  if (!url.includes('cloudinary.com') || !url.includes(uploadSegment)) {
    return url;
  }

  const [, afterUpload = ''] = url.split(uploadSegment);
  if (afterUpload.includes('f_auto') || afterUpload.includes('q_auto')) {
    return url;
  }

  const transformation = `f_auto,q_auto,w_${width},c_limit/`;
  return url.replace(uploadSegment, `${uploadSegment}${transformation}`);
}

export default getOptimizedImageUrl;
