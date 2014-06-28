function LayerData(layer) {
        this.l=layer;
        this.show = true;
    }
    
    LayerData.prototype.hide = function() {
        this.show=false;
    }
    
    LayerData.prototype.show = function() {
        this.show=true;
    }
    
    LayerData.prototype.toggleShown = function() {
        this.show = !this.show;
    }
    
    LayerData.prototype.isShown = function() {
        return show;
    }
    
    LayerData.prototype.getLayer = function() {
        return l;
    } 