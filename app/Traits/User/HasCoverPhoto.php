<?php

namespace App\Traits\User;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Jetstream\Features;

trait HasCoverPhoto
{
    /**
     * Update the user's cover photo.
     *
     * @param  string  $storagePath
     * @return void
     */
    public function updateCoverPhoto(UploadedFile $photo, $storagePath = 'cover-photos')
    {
        tap($this->cover_photo_path, function ($previous) use ($photo, $storagePath) {
            $this->forceFill([
                'cover_photo_path' => $photo->storePublicly(
                    $storagePath, ['disk' => $this->coverPhotoDisk()]
                ),
            ])->save();

            if ($previous) {
                Storage::disk($this->coverPhotoDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the user's cover photo.
     *
     * @return void
     */
    public function deleteCoverPhoto()
    {
        if (! Features::managesProfilePhotos()) {
            return;
        }

        if (is_null($this->cover_photo_path)) {
            return;
        }

        Storage::disk($this->coverPhotoDisk())->delete($this->cover_photo_path);

        $this->forceFill([
            'cover_photo_path' => null,
        ])->save();
    }

    /**
     * Get the URL to the user's Cover photo.
     */
    public function coverPhotoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->cover_photo_path
                    ? Storage::disk($this->coverPhotoDisk())->url($this->cover_photo_path)
                    : $this->defaultCoverPhotoUrl();
        });
    }

    /**
     * Get the default cover photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultCoverPhotoUrl()
    {
        return 'https://placehold.co/1216x320/A9C8E7/A9C8E7';
    }

    /**
     * Get the disk that cover photos should be stored on.
     *
     * @return string
     */
    protected function coverPhotoDisk()
    {
        return isset($_ENV['VAPOR_ARTIFACT_NAME']) ? 's3' : config('jetstream.profile_photo_disk', 'public');
    }
}
