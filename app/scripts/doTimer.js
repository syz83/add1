function doTimer(length, resolution, oninstance, oncomplete)
{
    var steps = (length / 100) * (resolution / 10),
        speed = length / steps,
        count = 0,
        start = new Date().getTime();
        currentTimeout = null;

    function instance()
    {
        if(count++ == steps)
        {
            oncomplete(steps, count);
        }
        else
        {
            oninstance(steps, count);

            var diff = (new Date().getTime() - start) - (count * speed);
            currentTimeout = window.setTimeout(instance, (speed - diff));
        }
    }

    function destroy(){
        clearTimeout(currentTimeout);
    }

    currentTimeout = window.setTimeout(instance, speed);
}