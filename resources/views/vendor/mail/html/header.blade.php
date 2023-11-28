@props(['url'])
<div class="sm-my-8" style="margin-top: 48px; margin-bottom: 48px; text-align: center">
    <a href="{{ $url }}">
        <img src="{{ env('CLOUDFLARE_R2_URL') }}/TextLogo.png" width="75%" />
    </a>
</div>